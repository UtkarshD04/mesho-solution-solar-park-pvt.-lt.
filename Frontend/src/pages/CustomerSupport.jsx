import AfterSalesService from '../components/contact/AfterSalesService'
const THEME = '#033e74'

export default function CustomerSupport() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 px-6 max-w-3xl mx-auto pt-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-4">We're Here For You</p>
          <h1 className="text-5xl sm:text-6xl font-black uppercase leading-tight mb-5">Customer Support</h1>
          <p className="text-white/70 text-base max-w-xl mx-auto leading-relaxed">
            Get help with your Mesho Battery products — from technical support to warranty claims and order tracking.
          </p>
        </div>
      </section>

      {/* SUPPORT CHANNELS */}
    

      {/* SERVICE REQUEST FORM */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: THEME }}>Raise a Ticket</p>
            
            in the details below and our service team will get back to you within 24 hours.
        
          </div>

          <AfterSalesService />
        </div>
      </section>

          
     

    </div>
  )
}
