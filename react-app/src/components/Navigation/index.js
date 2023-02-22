import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/" activeClassName='active' activeStyle={{ color: 'yellow' }} style={{ color: 'white' }}>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink exact to='/play' activeClassName='active' activeStyle={{ color: 'yellow' }} style={{ color: 'white' }}>
					Play
				</NavLink>
			</li>
			<li>
				<NavLink exact to='/forum' activeClassName='active' activeStyle={{ color: 'yellow' }} style={{ color: 'white' }}>
					Forum
				</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
