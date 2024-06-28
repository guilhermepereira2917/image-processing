import AllFilters from "@/components/AllFilters";
import CodeSnippet from "./code/page";

export default function Home({ searchParams }: { searchParams: { filter: string } }) {
  return (
    <>
      <AllFilters />
      <CodeSnippet searchParams={searchParams}/>
    </>
  )
}
