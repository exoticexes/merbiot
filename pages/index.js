import React from 'react'

export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div>
            <div className="brand">merbiot</div>
            <div className="small-muted">Link-in-bio platform (MVP)</div>
          </div>
          <div>
            <a className="cta" href="/auth/signin">Profil Oluştur</a>
          </div>
        </div>

        <div style={{marginTop:22}}>
          <h2>Hemen kendi link sayfanı oluştur</h2>
          <p className="small-muted">Kendi profil sayfanı oluşturup linklerini paylaş. Örnek profil görmek için aşağıya tıkla.</p>

          <div style={{marginTop:18}} className="center">
            <a className="cta" href="/p/example" style={{display:'inline-block', marginRight:12}}>Örnek Profili Aç</a>
            <a href="/auth/signin" style={{display:'inline-block', padding:'10px 14px', borderRadius:8, background:'#0b1220', color:'#cbd5e1', textDecoration:'none'}}>Profil Oluştur</a>
          </div>

          <div style={{marginTop:20}}>
            <h4>Neler yapabilirsin?</h4>
            <ul>
              <li>Kısa bio ve avatar ekle</li>
              <li>Birden fazla link ekleyip sıralayabilirsin</li>
              <li>Link sayfanı sosyal profillerde paylaş</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
