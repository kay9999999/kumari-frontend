import Link from 'next/link';

const successPage = () => {
        return (

            <div className="flex items-center justify-center min-h-screen bg-white">
                      
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-black mb-4">
                                Thank you for your purchase!
                            </h1>
                            <p className="text-lg text-gray-600">
                                Your order number is <span className='text-black font-semibold'>ORD-1234000000567</span>.
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                We’ll email you an order confirmation with details and tracking info.
                            </p>
                           
                                <Link href="/home" className="font-medium">
                                    Continue Shopping →
                                </Link>
                        </div>
            </div>
  )
}

export default successPage
