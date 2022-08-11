import Modal from "react-modal";
import { UserData } from "../../assets/types";
import {Container,ImageUser,InfoUserContainer } from "./styles";
import { X } from "phosphor-react";

interface UserInfoModalProps {
    isOpen: boolean
    onRequestClose: () => void
    userSelected:UserData |undefined
}

function ModalInfo({isOpen,onRequestClose,userSelected}:UserInfoModalProps) {
    return ( 
        <Modal
            isOpen={isOpen}
            onRequestClose={() => { }}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
            ariaHideApp={false}
            contentLabel="Informações do usuario selecionado"
         >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
            <X size={24} color="#a8a8b3" weight="bold" />
            </button>
            <Container>
                <ImageUser>
                    <img src={userSelected?.picture.medium} alt="Foto do usuario" />
                </ImageUser>
                <InfoUserContainer>
                    <p><strong>Nome:</strong>{`${userSelected?.name.first}${ userSelected?.name.last}`}</p>
                    <p><strong>Email:</strong>{userSelected?.email }</p>
                    <p><strong>Celular:</strong>{userSelected?.cell }</p>
                    <p><strong>Idade:</strong>{ userSelected?.dob.age}</p>
                </InfoUserContainer>
            </Container>
            
        </Modal>
     );
}

export default ModalInfo;