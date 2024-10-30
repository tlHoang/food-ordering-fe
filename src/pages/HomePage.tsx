import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  }
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 bg-gray-200">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Lorem ipsum dolor
        </h1>
        <span className="text-xl">Lorem ipsum</span>
        <SearchBar placeHolder="Tìm kiếm Thành phố, ..." onSubmit={handleSearchSubmit} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Lorem ipsum dolor sit amet.
          </span>
          <span>
            Qui sit, assumenda tempora quia veniam enim vero fugiat.
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  )
}

export default HomePage;