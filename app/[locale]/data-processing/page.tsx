import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DataProcessingPage() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />

      <main className="pt-[120px] pb-28 px-5 lg:px-10 max-w-3xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-[1.5px] bg-gold" />
          <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-gold/70">
            Legal
          </span>
        </div>

        <h1 className="font-syne font-bold text-4xl md:text-5xl text-white leading-[1.15] mb-4">
          Privacy Policy
        </h1>
        <p className="font-syne text-gold/80 text-[17px] font-medium mb-12">
          How We Handle Your Data
        </p>

        <div className="space-y-6 font-dm text-white/60 text-[15px] leading-relaxed">
          <p>
            Clariva strictly adheres to all applicable legal regulations. Before storing and
            processing your personal data, we request your explicit consent.
          </p>

          <p>
            To withdraw your consent, please contact us at:{' '}
            <a
              href="mailto:info@clariva.sk"
              className="text-gold/80 hover:text-gold transition-colors duration-200"
            >
              info@clariva.sk
            </a>
          </p>

          <div>
            <p className="mb-4">
              We store your data—such as phone numbers, email addresses, and CVs—exclusively
              in the following secure locations:
            </p>
            <ul className="space-y-3 pl-0">
              {[
                'Google Drive – Clariva Team Drive',
                'Clariva CRM',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gold/50 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            For short periods of time, these data may also be temporarily stored on the
            computers of authorized Clariva personnel.
          </p>

          <p>
            If it is necessary to contact a client or share your CV for the purpose of
            arranging an interview, we will either inform you beforehand and request your
            consent for the client to process your data, or we will proceed based on your
            previously granted consent that allows Clariva&apos;s clients and partners to
            process your data. Without your prior consent, we only share anonymized candidate
            profiles that do not contain names, contact details, or any other personal
            information.
          </p>

          <p>
            Once a client receives and processes your data, they assume the responsibility of
            providing you with the ability to withdraw your consent for their further
            processing of your personal information.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
