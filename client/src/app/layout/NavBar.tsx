import { Button, Container, Menu } from "semantic-ui-react";
import logo from '../../../public/assests/logo.png'

interface Props {
	openForm: () => void;
}
export default function NavBar({ openForm }: Props) {

    return (
		<Menu
			inverted
			fixed='top'
		>
			<Container>
				<Menu.Item header>
					<img src={logo} alt='logo' style={{marginRight: 10}}/>
                    Reactivities
				</Menu.Item>
				<Menu.Item name='Activities' />
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={openForm}/>
                </Menu.Item>
			</Container>
		</Menu>
	);
}