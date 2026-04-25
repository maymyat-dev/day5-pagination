import React, { useEffect, useState } from 'react'


type Product = {
    id: number;
    title: string;
    price: number;
    rating: number;
    images: string[];
}
function LogicPractice() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string| null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / 10);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products?limit=10&skip=${(page-1)*10}`);

                if (!response.ok) {
                    throw new Error("Network error")
                }
                const data = await response.json();
                setProducts(data.products)
                setTotal(data.total)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    },[page])

    if (error) {
        return <p>Error: { error }</p>
    }

    const filteredAndSortProducts = products.filter((p)=>p.rating > 1).sort((a,b)=> a.price - b.price)
  return (
      <div>{
        loading &&  filteredAndSortProducts.length === 0 ? (
              <p> No product found</p>
          ) : (
                  <>
                  <ul className='grid grid-cols-4'>
                      {
                          filteredAndSortProducts.map((p) => (
                              <li key={p.id}>
                                  <img src={p.images[0]} alt={p.title} width={100} height={100} className='mx-auto'/>
                                  <p>{p.title}</p>
                                  <p>{p.price}</p>
                              </li>
                          ))
                      }
                      </ul>
                      <div className='flex gap-4 mt-4 justify-center'>
                          <button type='button' onClick={()=>setPage(prev=> prev-1)} disabled={page <= 1} >
                          Previous
                          </button>
                          {page}
                      <button type='button' onClick={()=> setPage(prev => prev +1)} disabled={page >= totalPages}>
                          Next
                      </button>
                      </div>
                  </>
                  
          )
      }</div>
  )
}

export default LogicPractice