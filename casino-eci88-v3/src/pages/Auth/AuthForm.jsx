import React from "react";
import { AuthFormContainer, AuthFormLinks } from "./Auth.styled";
import Link from "../../components/common/Link";
import Button from "../../components/common/Button";

function AuthForm({title, linksTitle, links, children}) {
  return (
    <AuthFormContainer>
      <h2 className="auth-heading">{title}</h2>
      {children}
      <AuthFormLinks className="links_container">
        {
            linksTitle &&
            <Link $fontSize="14px" $fontWeight="100" $margin="10px 0">
                {linksTitle}
            </Link>
        }
        {
            links?.map(link=>(
                <Button key={link} $width="200px">
                    <Link to={`${link.path}`}>{link.title}</Link>
                </Button>
            ))
        }
      </AuthFormLinks>
    </AuthFormContainer>
  );
}

export default React.memo(AuthForm);
