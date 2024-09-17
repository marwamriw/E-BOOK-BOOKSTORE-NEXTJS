import SingleBook from "@/components/SingleBook";

interface props {
  params: { id: number };
}

export default async function bookId({ params }: props) {
  const response = await fetch(`http://localhost:4000/api/book/${params.id}`);
  const data = await response.json();
  
  return (
    <div>
      <SingleBook data={data} />
    </div>
  );
}
