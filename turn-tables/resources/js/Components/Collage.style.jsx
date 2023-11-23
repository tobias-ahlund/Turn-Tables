import styled from "styled-components";
import Decoration2 from "@/public/images/decoration2.jpg";
import Furniture2 from "@/public/images/furniture2.jpg";
import Lighting2 from "@/public/images/lighting2.jpg";
import HeaderImage from "@/public/images/hugo-throw-blanket.jpg";
import { Link } from "@inertiajs/react";

const Banner = styled.div`
	width: 100%;
    font-size: 2rem;
	margin-top: 2rem;
    line-height: 2.5rem;
	display: flex;
	justify-content: center;
	margin-bottom: 4rem;

	div {
		max-width: 600px;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		justify-content: center;
	}

	div > h2 {
		font-size: 2rem;
		font-weight: bold;
	}

	div > p {
		font-size: 1.5rem;
		line-height: 2rem;
	}

	div > a > button {
		font-size: 1.5rem;
		background-color: #2d6fa5;
		border-radius: 50px;
		color: white;
		padding: .5rem 1rem;
		font-weight: bold;
	}

	img {
		max-width: 500px;
		max-height: 500px;

		@media (max-width: 1200px) {
			display: none;
		}
	}

	@media (max-width: 1200px) {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
`;

const CollageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 2rem;
  width: 100%;
  margin: 2rem 0 4rem 0;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const CollageItemWrapper = styled.div`
  position: relative;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
	aspect-ratio: 3/4;
	position: relative;
  }

  span {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%);
	color: white;
	background-color: rgba(0, 0, 0, .3);
	padding: .5rem 1rem;
	font-weight: bold;
	border-radius: 50px;
	font-size: 1.5rem;
	white-space: nowrap;

	@media (max-width: 800px) {
		font-size: .8rem;
		padding: .3rem .7rem;
	}
  }
`;

const imagesArr = [
    Furniture2,
    Lighting2,
    Decoration2,
]

const shop = [
	"Shop Furniture",
	"Shop Lighting",
	"Shop Home Decor",
]

export default function Collage() {
  return (
    <>
    <Banner>
		<div>
			<h2>Designing Comfort, Tailoring Style</h2>
			<p>At our core, we specialize in creating spaces that effortlessly embrace your unique taste, with carefully curated designs that bring comfort and style to the forefront of your environment.</p>
			<Link href={route('products')}>
				<button>SHOP NOW</button>
			</Link>
		</div>
			<img src={HeaderImage} alt="page header" />
    </Banner>
    <CollageWrapper>
        {imagesArr.map((item, index) => (
            <CollageItemWrapper key={index}>
				<Link>
					<img src={item} alt="collage image" />
					<span>{shop[index]}</span>
				</Link>
            </CollageItemWrapper>
        ))}
    </CollageWrapper>
    </>
  );
}
