import React, { useEffect, useState } from 'react'


type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}
function LogicPractice() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string| null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);

                if (!response) {
                    throw new Error("Network error")
                }
                const data = await response.json();
                setProducts(data)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    },[])

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: { error }</p>
    }

    const filteredAndSortProducts = products.filter((p)=>p.rating?.count > 100).sort((a,b)=> a.price - b.price)
  return (
      <div>{
          filteredAndSortProducts.length === 0 ? (
              <p> No product found</p>
          ) : (
                  <ul>
                      {
                          filteredAndSortProducts.map((p) => (
                              <li>
                                  <p>{p.title}</p>
                                  <p>{p.price}</p>
                                  <p>{p.rating.count}</p>
                              </li>
                          ))
                      }
                  </ul>
          )
      }</div>
  )
}

export default LogicPractice