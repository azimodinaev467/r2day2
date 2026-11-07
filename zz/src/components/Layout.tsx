import { Link, Outlet } from 'react-router'
export default function Layout() {
  return (
    <div>
      <Link to={"/"}> Home</Link>
      <Link to={"/abaut"}> About</Link>
      <Outlet />





    </div>
  )
}
