const Newsletter = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault();
    alert('You have subscribed successfully');
    console.log('You have subscribed successfully')
  }
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% on your first order.</p>
      <p className="text-gray-400 mt-3">Be the first to know about new arrivals, sales & promos!</p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 mx-auto my-6 flex items-center border pl-3">
        <input type="email" placeholder="Enter your email" className="w-full sm: flex-1 outline-none" required/>
        <button type="submit" className="bg-black text-white text-xs px-10 py-4">Subscribe!</button>
      </form>
    </div>
  )
}

export default Newsletter
