import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
  let params = useParams();
  const [recipe, setRecipe] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchRecipe = async (id) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    // console.log(data);
    setRecipe(data);
  };

  useEffect(() => {
    fetchRecipe(params.id);
  }, [params.id]);

  return (
    <DetailWrapper>
      <div>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>

        {activeTab === "instructions" && (
          <Instructions>
            <h4 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h4>
            <h3>Making: </h3>
            <h4 dangerouslySetInnerHTML={{ __html: recipe.instructions }}></h4>
          </Instructions>
        )}

        {activeTab === "ingredients" && (
          <Ingredients>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </Ingredients>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin: 5rem 0;
  display: flex;
  flex-direction: row;
  h2 {
    margin-bottom: 2rem;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  img {
    border-radius: 1rem;
  }
  @media (max-width: 1080px) {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
`;

const Info = styled.div`
  width: 100%;
  margin: 1rem 0;
  margin-left: 2rem;
  button:nth-child(2) {
    margin-left: 2rem;
  }

  @media (max-width: 1080px) {
    margin-left: 0;
    text-align: center;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
`;

const Instructions = styled.div`
  margin: 1rem 0 0 0rem;
  width: 100%;
  text-align: justify;
  a {
    color: #313131;
  }
  h4 {
    font-size: 1.2rem;
  }
`;

const Ingredients = styled.ul`
  text-align: left;
`;

export default Recipe;
