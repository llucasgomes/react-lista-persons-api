//components
import { Container, Content, ImageLogo } from "./styles";
import logoSvg from "../../assets/icons/logo.svg";

function Header() {
    return ( 
        <Container>
            <Content>
                <ImageLogo src={ logoSvg} alt="Logo" />
                <button>
                    <img src="https://avatars.githubusercontent.com/u/96358624?v=4" alt="Imagem de Pèrfil" />
                </button>
            </Content>
        </Container>
     );
}

export default Header;