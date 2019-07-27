import React from 'react';
import TestRenderer from 'react-test-renderer';
import Event from './Event'

const data = {
    'name':'Shanghai Shenhua 0 v 0 Shandong Luneng Taishan',
    'startTime':'2017-09-19T11:35:23.000Z'
}
test('Event Renders', () => {
    TestRenderer.create(
        <Event data={data}/>
    )
})


