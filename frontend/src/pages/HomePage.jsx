import ApiStatus from '../components/ApiStatus.jsx'

function HomePage() {
  return (
    <>
      <h1>Välkommen till SubTracker</h1>
      <p className="lead">Samla dina prenumerationer och se vad de kostar per månad.</p>
      <ApiStatus />
    </>
  )
}

export default HomePage
