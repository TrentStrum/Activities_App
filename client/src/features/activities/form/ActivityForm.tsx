import { Button, Form, Segment } from 'semantic-ui-react';
import { ChangeEvent, useState } from 'react';
import { useActivityContext } from '../../../app/stores/ActivityContext';

export default function ActivityForm() {
		const {
			selectedActivity,
			createOrEditActivity,
			isSubmitting,
			closeForm,
		} = useActivityContext();

	const initialState = selectedActivity ?? {
		id: '',
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		venue: '',
	};

	const [activity, setActivity] = useState(initialState);

	function handleSubmit() {
		createOrEditActivity(activity);
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setActivity({ ...activity, [name]: value });
	}

	return (
		<>
			<Segment clearing>
				<Form
					onSubmit={handleSubmit}
					autoComplete='off'
				>
					<Form.Input
						placeholder='Title'
						value={activity.title}
						name='title'
						onChange={handleInputChange}
					/>
					<Form.TextArea
						placeholder='Description'
						value={activity.description}
						name='description'
						onChange={handleInputChange}
					/>
					<Form.Input
						placeholder='Category'
						value={activity.category}
						name='category'
						onChange={handleInputChange}
					/>
					<Form.Input
						placeholder='Date'
						value={activity.date}
						type='date'
						name='date'
						onChange={handleInputChange}
					/>
					<Form.Input
						placeholder='City'
						value={activity.city}
						name='city'
						onChange={handleInputChange}
					/>
					<Form.Input
						placeholder='Venue'
						value={activity.venue}
						name='venue'
						onChange={handleInputChange}
					/>
					<Button
						loading={isSubmitting}
						floated='right'
						positive
						type='submit'
						content='Submit'
					/>
					<Button
						floated='right'
						type='submit'
						content='Cancel'
						onClick={closeForm}
					/>
				</Form>
			</Segment>
		</>
	);
}
