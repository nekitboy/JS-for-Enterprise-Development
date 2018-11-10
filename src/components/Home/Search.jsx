import React from 'react'
import {TextField} from "@material-ui/core/";
import {reduxForm, Field} from "redux-form";

import "./search.css"

export class Search extends React.Component {
    render() {
        return (
            <form onKeyPress={(e) => {if (e.key === 'Enter') e.preventDefault()}}>
                <Field name='title_s' component={AdaptedTextField} className={'input'} margin='normal' label='Поиск' placeholder='Введите название мероприятия для поиска' InputLabelProps={{
                    shrink: true,
                }}/>
                <Field name='date_s' component={AdaptedTextField} className={'input'} onBlur={(e) => {e.preventDefault()}} onFocus={(e) => {e.preventDefault()}} type={'date'} label='Дата' InputLabelProps={{
                    shrink: true,
                }} margin='normal' />
            </form>
        )
    }
}

const AdaptedTextField = ({input: {value, onChange}, meta: { touched, error }, label, type, ...custom}) => {
    if (type === 'date' && new Date(value).getTime() <= (new Date().getTime() - 1000*60*60*24)) {
        error = true
        label = 'Дата уже прошла'
    }
    return(
        <TextField
            value={value}
            onChange={onChange}
            error={error}
            type={type}
            label={label}
            {...custom}
        />
    )
}

const initialValues = {
    date_s: '',
    title_s: ''
};


export default reduxForm({form: 'search', destroyOnUnmount: false, initialValues})(Search);
