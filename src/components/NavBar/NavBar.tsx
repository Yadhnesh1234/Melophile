import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/userReducer";
import { setSearch } from "../../reducers/songReducer";
import { NotificationIconType, showToast } from "../../atom/Notification";
import { Button } from "../../atom/Button";
import { Input } from "../../atom/InputBox";
import {
  CustomHeader,
  Container,
  LogoContainer,
  Logo,
  SearchBoxContainer,
  ButtonContainer,
} from "./style"; 



const NavHeader: FC<NavHeaderProps> = ({ children }) => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchData === "") {
      showToast({
        message: "Enter a song or artist name to search.",
        description: " ",
        iconType: NotificationIconType.CROSS,
      });
    } else {
      try {
        setIsLoading(true);
        if (user.isLoggedIn === true) {
          dispatch(setSearch({ search: searchData }));
        } else {
          navigate("/login");
          showToast({
            message: "Please log in to access this feature.",
            description: "",
            iconType: NotificationIconType.EXCLAMATORY,
          });
        }
      } catch (error) {
        console.error("Error while handling form submit:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <CustomHeader>
      <Container>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <SearchBoxContainer>
          <form onSubmit={handleFormSubmit}>
            <div style={{ display: "flex" }}>
              <Input
                id="searchData"
                name="searchData"
                placeholder="Search For Song"
                value={searchData}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchData(e.target.value)
                }
              />
              <Button
                variant="primary"
                size={"large"}
                text={"Search"}
                type={"submit"}
                style={{ marginLeft: "4px", marginTop: "8px" }}
                isDisable={isLoading}
              />
            </div>
          </form>
        </SearchBoxContainer>
      
      <ButtonContainer>
        {!user.isLoggedIn && (
          <Button
            variant="primary"
            size={"large"}
            text={"Login"}
            type={"submit"}
            onClick={handleNavigate}
            isDisable={isLoading}
          />
        )}
        {user.isLoggedIn && (
          <Button
            variant="primary"
            size={"large"}
            text={"Log Out"}
            type={"submit"}
            onClick={handleLogout}
            isDisable={isLoading}
          />
        )}
      </ButtonContainer>
      </Container>
    </CustomHeader>
  );
};

export default NavHeader;
