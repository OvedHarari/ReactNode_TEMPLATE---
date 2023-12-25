import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    let theme = useContext(SiteTheme);
    return (<div className={`container mt-3 ${theme}`}>
        <h1 className='mt-5'>Basic Template!!</h1>
    </div>);
}

export default Home;