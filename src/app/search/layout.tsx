import Navbar from '@/components/core/Navbar'

export default function SearchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
