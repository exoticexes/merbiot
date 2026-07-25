import React, { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignIn(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      setMessage('Magic link gönderildi — e-postanı kontrol et.')
    } catch (err) {
      console.error(err)
      setMessage('Bir hata oluştu. Konsolu kontrol et.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 20 }}>
      <h2>Giriş / Kayıt (E-posta magic link)</h2>
      <p>E-posta adresini gir, sana giriş bağlantısı gönderelim.</p>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: '10px 14px' }} disabled={loading}>
          {loading ? 'Gönderiliyor...' : 'Giriş bağlantısı gönder'}
        </button>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
      <hr style={{ margin: '24px 0' }} />
      <p>
        Not: Eğer e-posta gelmiyorsa Supabase dashboard'undan SMTP ayarlarını kontrol edin.
      </p>
    </div>
  )
}
