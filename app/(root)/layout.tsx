import Navbar from "../../components/Navbar"

const layout = ({children} : Readonly<{children: React.ReactNode }>) => {
  return (
      <div className="font-work-sans">
        <Navbar/>
         {children}
      </div>
  )
}

export default layout