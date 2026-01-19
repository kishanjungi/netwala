import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])
  const [stockMap, setStockMap] = useState({})

  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`)
      if (res.data.success) {
        setList(res.data.products)

        // initialize stock map
        const map = {}
        res.data.products.forEach(p => {
          map[p._id] = p.stock
        })
        setStockMap(map)
      }
    } catch (err) {
      toast.error("Failed to load products")
    }
  }

  const updateStock = async (productId) => {
    try {
      const stock = stockMap[productId]

      const res = await axios.put(
        `${backendUrl}/api/product/update-stock`,
        { productId, stock },
        { headers: { token } }
      )

      if (res.data.success) {
        toast.success("Stock updated")
        fetchList()
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log("AXIOS ERROR 👉", error.response)
      toast.error(error.response?.data?.message || "Stock update failed")
    }
  }

  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        fetchList()
      }
    } catch (err) {
      toast.error("Delete failed")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2 font-semibold'>All Products</p>

      <div className='flex flex-col gap-2'>

        {/* HEADER */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] bg-gray-100 px-2 py-1 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Stock</b>
          <b>Update</b>
          <b>Delete</b>
        </div>

        {/* ROWS */}
        {list.map(item => (
          <div
            key={item._id}
            className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center border px-2 py-1 text-sm'
          >
            <img src={item.image[0]} className='w-12' />

            <p>{item.name}</p>

            <p>{currency}{item.price}</p>

            {/* STOCK INPUT */}
            <input
              type="number"
              min="0"
              value={stockMap[item._id] ?? 0}
              onChange={(e) =>
                setStockMap({
                  ...stockMap,
                  [item._id]: Number(e.target.value)
                })
              }
              className='border w-20 px-1'
            />

            {/* UPDATE */}
            <button
              onClick={() => updateStock(item._id)}
              className='bg-green-600 text-white px-2 py-1 rounded'
            >
              Update
            </button>

            {/* DELETE */}
            <button
              onClick={() => removeProduct(item._id)}
              className='text-red-600 font-bold'
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default List
