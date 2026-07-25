// Simple API stub to return a profile by slug
export default async function handler(req, res) {
  const { slug } = req.query
  if (!slug) return res.status(400).json({ error: 'Missing slug' })

  // TODO: Replace with real DB lookup (Postgres / Supabase / Prisma)
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

  // Default: not found
  return res.status(404).json({ error: 'Profile not found' })
}
