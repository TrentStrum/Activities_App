import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
	activity: Activity;
	cancelSelectActivity: () => void;
	openForm: (id: string) => void;
}

export default function ActivityDetails({ activity, cancelSelectActivity, openForm }: Props) {
	return (
		<>
			<Card fluid>
				<Image
					src={`../../../../public/assests/categoryImages/${activity.category}.jpg`}
					alt=''
				/>
				<Card.Content>
					<Card.Header>{activity.title}</Card.Header>
					<Card.Meta>
						<span>{activity.date}</span>
					</Card.Meta>
					<Card.Description>{activity.description}</Card.Description>
				</Card.Content>
				<Card.Content>
					<Button.Group widths='2'>
						<Button
							basic
							color='blue'
							content='edit'
							onClick={() => openForm(activity.id)}
						/>
						<Button
							basic
							color='grey'
							content='cancel'
							onClick={cancelSelectActivity}
						/>
					</Button.Group>
				</Card.Content>
			</Card>
		</>
	);
}
