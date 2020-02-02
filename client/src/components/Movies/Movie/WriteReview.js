import React from 'react';

const WriteReview = ({ setComment, comment, handleSubmitReview }) => {
	return (
		<div className='mb-2 border-bottom'>
			<textarea
				onChange={(e) => setComment(e.target.value)}
				className='form-control w-100'
				name='comment'
				id='commentPanel'
				rows='4'
				value={comment}
			/>
			<div className='text-right'>
				<button onClick={() => handleSubmitReview()} className='mb-2 mt-2 btn btn-success btn-sm'>
					Submit
				</button>
			</div>
		</div>
	);
};

export default WriteReview;
