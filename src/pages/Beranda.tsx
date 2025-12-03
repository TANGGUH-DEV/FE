
  import { Navbar } from "../components/bundlingBeranda/navbar";
  import { Hero } from "../components/bundlingBeranda/hero";
  import { Gallery } from "../components/Media/gallery";
  import { Contact } from "../components/contact/contact";
  import Footer from "../components/bundlingBeranda/footer";
  import About from "../components/about/about";
  import Portfolio from "../components/portfolio/portfolioBeranda";
  import Services from "../components/portfolio/service";
  import { BeritaList } from "../components/berita/halamanBerita";
  import api from "../interceptor/intercep";
  import { useQuery } from "@tanstack/react-query";

  export function HomePage() {

    const beritaQuery = useQuery({
      queryKey: ["berita"], 
      queryFn: async () => {
        const res = await api.get("/berita/berita");
        return res.data;
      }
    });

    const mediaQuery = useQuery({
      queryKey: ["media"], 
      queryFn: async () => {
        const res = await api.get("/media/public-media"); 

        const slice = res.data.results.slice (0,10);
        
        return slice.map((item: any) => ({
        id: item.id,
        title: item.title,
        deskripsi: item.description,
        url: item.file_get_optimized,
        type: item.media_type,
        category: "",
        }))
      }
    });

    if (beritaQuery.isLoading || mediaQuery.isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <>
        <Navbar activeSection="portfolio" onNavigate={(section) => console.log(section)} />
        <Hero imageUrl="/assets/drone-shot.jpg" />
        <About />
        <Portfolio/>
        <Services/>
        <Gallery data={mediaQuery.data ?? []} isLoading={mediaQuery.isLoading}/>
        <BeritaList data={beritaQuery.data ?? [] } isLoading={beritaQuery.isLoading}/>
        <Contact />
        <Footer />
      </>
    );
  }
