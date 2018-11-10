import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json';
import Loader from '../components/Home/loader'

describe('Render without props', () => {
    const LoaderComp = shallow(<Loader  />)

    it('render initial', () => {
        expect(LoaderComp.find('p')).toHaveLength(1) // .find + поиск по тэгу
        var rendered = LoaderComp.find('p').render();
        console.log(rendered.text());
        expect(rendered.text()).toBe('Loading')
        expect(LoaderComp.find('WithStyles(LinearProgress)')).toHaveLength(1) // .find + поиск по имени компонента
    })

})

describe('Render with prop title=Title', () => {
    const props = { // описываем props
        title: 'Title'
    }
    const LoaderComp = shallow(<Loader {...props} />)

    it('render initial', () => {
        expect(LoaderComp.find('p')).toHaveLength(1) // .find + поиск по тэгу
        var rendered = LoaderComp.find('p').render();
        console.log(rendered.text());
        expect(rendered.text()).toBe('Title')
        expect(LoaderComp.find('WithStyles(LinearProgress)')).toHaveLength(1) // .find + поиск по имени компонента
    })

})