import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import "@splidejs/react-splide/css";

const API = `https://api.spoonacular.com/recipes/random?number=9&tags=vegetarian&apiKey=${process.env.REACT_APP_API_KEY}`;
function Popular() {
  const [popular, setPopular] = useState([]);

  // get recipes
  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const response = await fetch(API);
      const data = await response.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };
  useEffect(() => {
    getPopular();
  }, []);
  return (
    <div>
      <Wrapper>
        <h3>Popular dishes</h3>
        <Splide
          options={{
            perPage: 4,
            drag: "free",
            arrows: false,
            pagination: false,
            gap: "1.5rem",
          }}
        >
          {popular.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={"/recipe/" + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25vh;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    padding: 5px;
    width: 100%;
    padding: 3px;
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    color: white;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
