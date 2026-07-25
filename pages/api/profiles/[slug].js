import { supabase } from '../../../lib/supabaseClient'

export default async function handler(req, res) {
  const { slug } = req.query
  if (!slug) return res.status(400).json({ error: 'Missing slug' })

  // Example stub
  if (slug === 'example') {
    return res.status(200).json({
      slug: 'example',
      title: 'Örnek Kullanıcı',
      bio: 'Merhaba! Bu örnek merbiot profili. Profilinizi düzenlemek için giriş yapın.',
      avatar_url: '/placeholder-avatar.svg',
      bg_image_url: '/placeholder-bg.svg',
      theme: {
        buttonColor: '#ff3b30',
        buttonTextColor: '#ffffff',
        backgroundType: 'image',
        backgroundColor: '#0f172a'
      },
      links: [
        { id: 1, title: 'Kişisel Site', url: 'https://example.com' },
        { id: 2, title: 'GitHub', url: 'https://github.com' },
        { id: 3, title: 'LinkedIn', url: 'https://linkedin.com' }
      ],
      showMerbiotCredit: true
    })
  }

  try {
    // Fetch profile from Supabase by slug
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single()

    if (profileError || !profileData) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    const profile = profileData

    const { data: linksData, error: linksError } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', profile.id)
      .order('ordering', { ascending: false })

    if (linksError) {
      console.error('Links fetch error', linksError)
    }

    // Map DB fields to API shape
    const response = {
      slug: profile.slug,
      title: profile.title,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      bg_image_url: profile.bg_image_url,
      theme: profile.theme || {},
      links: (linksData || []).map(l => ({ id: l.id, title: l.title, url: l.url })),
      showMerbiotCredit: profile.show_merbiot_credit ?? true
    }

    return res.status(200).json(response)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}
