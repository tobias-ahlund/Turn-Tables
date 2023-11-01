import styled from "styled-components";
import Decoration from "@/public/images/decoration.jpg";
import Furniture from "@/public/images/furniture.jpg";
import Lighting from "@/public/images/lighting.jpg";
import Decoration2 from "@/public/images/decoration2.jpg";
import Furniture2 from "@/public/images/furniture2.jpg";
import Lighting2 from "@/public/images/lighting2.jpg";
import HeaderImage from "@/public/images/header.jpg";

const Header = styled.header`
    width: 100%;
    font-size: 2rem;
    line-height: 2.5rem;
`;

const CollageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 2rem;
  width: 100%;
  margin: 2rem 0 4rem 0;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const CollageItemWrapper = styled.div`
  position: relative;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const imagesArr = [
    Furniture,
    Lighting,
    Decoration,
    Furniture2,
    Lighting2,
    Decoration2,
]

export default function Collage() {
  return (
    <>
    <Header>
        <img src={HeaderImage} alt="page header" />
    </Header>
    <CollageWrapper>
        {imagesArr.map((item, index) => (
            <CollageItemWrapper key={index}>
                <img src={item} alt="collage image" />
            </CollageItemWrapper>
        ))}
    </CollageWrapper>
    </>
  );
}
