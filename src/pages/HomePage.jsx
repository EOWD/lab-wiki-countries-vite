import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    const data = async () => {
      try {
        const countriesData = await axios.get(
          " https://ih-countries-api.herokuapp.com/countries"
        );
        const x = countriesData.data.slice(0,50);
        setCountries(x);
      } catch (e) {
        console.log(e);
      }
    };
    data();
  }, []);

  console.log(countries);

  return (

    <>
      <h1>WikiCountries: Your Guide to the World</h1>
      {
        countries &&
        countries.map((x) => {
          return (
           
            <div key={x.alpha3Code} className="list-group">
              <Link
              to={`/country/${x.alpha3Code}`}
                className="list-group-item list-group-item-action"
              >
                <img
                  src={`https://flagpedia.net/data/flags/icon/72x54/${x.alpha2Code.toLowerCase()}.png`}
                  alt=""
                />
                <h3>{x.name.common}</h3>
              </Link>
            </div>
          );
        })}
    </>
  );
}

export default HomePage;
