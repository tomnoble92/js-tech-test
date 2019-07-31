import React from 'react';
import { shallow } from 'enzyme';
import ScoreBoard from './Scoreboard'

describe('ScoreBoard should render', () => {

    it('should be render with given strings', () => {
        const teams = ['home', 'away']
        const scores = {
            'home': 1,
            'away': 6
        }
        const component = shallow(<ScoreBoard teams={teams} scores={scores}  />)
        expect(component).toMatchSnapshot()
    })
})