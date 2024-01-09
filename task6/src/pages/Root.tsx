import { Outlet, useNavigation } from "react-router-dom"
import Sidebar from "../sidebar/Sidebar"
import Header from "../header/Header"
import { useEffect } from "react"
import { favoritesLoader } from "../../helpers/loaders"
import { useFavoriteStore } from "../store/favoriteStore"

function Root() {
  const { setFavorites } = useFavoriteStore();
  const navigation = useNavigation();
  
  useEffect(()=>{
    const fetchData = async () => {
      setFavorites(await favoritesLoader())
    }
    fetchData();
  },[])

    return (
        <>
        <Header />
        <div className="flex">
            <Sidebar />
            <div id="detail" className={`p-10 mt-16 flex grow ${navigation.state === "loading" && ' opacity-25 transition-opacity delay-200'}`}>
                <Outlet />
            </div>
        </div>
      </>
    )
  }
  
  export default Root