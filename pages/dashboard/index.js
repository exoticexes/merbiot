import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) console.error(error)
      if (mounted) setUser(data?.user ?? null)
      setLoading(false)
    })()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener?.subscription?.unsubscribe(), mounted = false
  }, [])

  useEffect(() => {
    if (!user) return
    fetchProfiles()
  }, [user])

  async function fetchProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setProfiles(data || [])
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) return <div style={{ padding: 24 }}>Yükleniyor...</div>

  if (!user) return (
    <div style={{ padding: 24 }}>
      <h3>Giriş yapmalısın</h3>
      <p><a href="/auth/signin">E-posta ile giriş yap</a></p>
    </div>
  )

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Merbiot Panel</h2>
        <div>
          <button onClick={handleSignOut} style={{ marginRight: 8 }}>Çıkış</button>
        </div>
      </div>

      <section style={{ marginTop: 18 }}>
        <h3>Profilin</h3>
        <p>Buradan yeni profil oluşturabilir veya var olan profilleri düzenleyebilirsin.</p>
        <ProfileForm user={user} onCreated={fetchProfiles} />

        <div style={{ marginTop: 18 }}>
          <h4>Mevcut Profiller</h4>
          {profiles.length === 0 && <p>Henüz profil yok.</p>}
          <ul>
            {profiles.map(p => (
              <li key={p.id} style={{ marginBottom: 8 }}>
                <strong>{p.title || p.slug}</strong> — <a href={`/p/${p.slug}`} target="_blank" rel="noreferrer">Görüntüle</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

function ProfileForm({ user, onCreated }) {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [bio, setBio] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [bgFile, setBgFile] = useState(null)
  const [creating, setCreating] = useState(false)
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'merbiot-bucket'

  async function uploadFile(file, pathPrefix) {
    if (!file) return null
    const filePath = `${pathPrefix}/${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from(bucket).upload(filePath, file, { cacheControl: '3600', upsert: false })
    if (error) {
      console.error('Upload error', error)
      return null
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
    return data.publicUrl
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!slug) return alert('slug gerekli')
    setCreating(true)
    try {
      const avatar_url = await uploadFile(avatarFile, `avatars/${user.id}`)
      const bg_image_url = await uploadFile(bgFile, `bg/${user.id}`)

      const { data, error } = await supabase.from('profiles').insert([{
        user_id: user.id,
        slug,
        title,
        bio,
        avatar_url,
        bg_image_url,
        theme: { buttonColor: '#ff3b30', buttonTextColor: '#fff', backgroundType: 'color', backgroundColor: '#0f172a' }
      }])

      if (error) throw error
      setSlug('')
      setTitle('')
      setBio('')
      setAvatarFile(null)
      setBgFile(null)
      onCreated && onCreated()
      alert('Profil oluşturuldu')
    } catch (err) {
      console.error(err)
      alert('Profil oluşturulurken hata oluştu')
    } finally {
      setCreating(false)
    }
  }

  return (
    <form onSubmit={handleCreate} style={{ border: '1px solid rgba(255,255,255,0.04)', padding: 12, borderRadius: 8 }}>
      <div style={{ marginBottom: 8 }}>
        <label>Slug (URL'de görünecek, ör: myname)</label>
        <input value={slug} onChange={(e) => setSlug(e.target.value)} required style={{ width: '100%', padding: 8 }} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Başlık / İsim</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: 8 }} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Bio</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} style={{ width: '100%', padding: 8 }} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <div>
          <label>Avatar (PNG/JPG)</label>
          <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)} />
        </div>
        <div>
          <label>Background (PNG/JPG)</label>
          <input type="file" accept="image/*" onChange={(e) => setBgFile(e.target.files?.[0] ?? null)} />
        </div>
      </div>
      <button type="submit" disabled={creating}>{creating ? 'Oluşturuluyor...' : 'Profil Oluştur'}</button>
    </form>
  )
}
