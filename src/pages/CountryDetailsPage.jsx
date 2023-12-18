import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

function CountryDetails() {
  const navigate = useNavigate();
  const countryCode = useParams();
  console.log(countryCode);
  const [country, setCountry] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const x = await axios.get(
          `https://ih-countries-api.herokuapp.com/countries/${countryCode.countryId}`
        );
        console.log(x);
        setCountry(x.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [countryCode]);

  console.log(country);

  if (!country) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  const back = () => {
    navigate(-1);
  };
  return (
    <>
      <h2>Country Details</h2>
      <button onClick={back}> Go back</button>
      <div className="container">
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>

        <h1>{country.name.common}</h1>

        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>Capital</td>
              <td>{country.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {country.area} km<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                  {country.borders.map((border) => (
                    <li key={border}>
                      <a href={`/country/${border}`}>{border}</a>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CountryDetails;
