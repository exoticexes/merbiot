import React from 'react'

export async function getServerSideProps(context) {
  const slug = context.params?.slug
  const req = context.req
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://${req.headers.host}`
  const res = await fetch(`${baseUrl}/api/profiles/${slug}`)
  if (!res.ok) return { notFound: true }
  const profile = await res.json()
  return { props: { profile } }
}

export default function ProfilePage({ profile }) {
  const theme = profile.theme || {}
  const bgStyle = profile.bg_image_url
    ? { background: `url(${profile.bg_image_url}) center/cover no-repeat` }
    : { backgroundColor: theme.backgroundColor || '#111' }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, ...bgStyle }}>
      <div style={{ width: 420, textAlign: 'center', background: 'rgba(0,0,0,0.45)', padding: 24, borderRadius: 12, color: '#fff' }}>
        {profile.avatar_url && (
          <div style={{ width: 120, height: 120, margin: '0 auto 12px' }}>
            <img src={profile.avatar_url} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
        )}
        <h2 style={{ margin: '6px 0' }}>{profile.title}</h2>
        <p style={{ color: '#ddd' }}>{profile.bio}</p>

        <div style={{ marginTop: 18 }}>
          {profile.links.map(link => (
            <a key={link.id}
               href={link.url}
               target="_blank"
               rel="noreferrer"
               style={{
                 display: 'block',
                 margin: '8px 0',
                 padding: '12px 16px',
                 background: theme.buttonColor || '#ff3b30',
                 color: theme.buttonTextColor || '#fff',
                 borderRadius: 10,
                 textDecoration: 'none'
               }}>
              {link.title}
            </a>
          ))}
        </div>

        {profile.showMerbiotCredit && (
          <div style={{ marginTop: 14, fontSize: 12, color: '#bbb' }}>creator by merbiot</div>
        )}
      </div>
    </div>
  )
}
