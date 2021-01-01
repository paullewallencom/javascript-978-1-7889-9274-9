/* @flow */

import React from "react";
import PropTypes from "prop-types";

import "../general.css";

export class CountrySelect extends React.PureComponent<{
    loading: boolean,
    list: Array<{
        countryCode: string,
        countryName: string
    }>,
    currentCountry: string,
    onSelect: string => void,
    getCountries: () => void
}> {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        list: PropTypes.arrayOf(PropTypes.object).isRequired,
        currentCountry: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
        getCountries: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.list.length === 0) {
            this.props.getCountries();
        }
    }

    onSelect = (e: { target: HTMLOptionElement }) =>
        this.props.onSelect(e.target.value);

    render() {
        if (this.props.loading) {
            return <div className="bordered">Loading countries...</div>;
        } else {
            const sortedCountries = [...this.props.list].sort(
                (a, b) => (a.countryName < b.countryName ? -1 : 1)
            );

            return (
                <div className="bordered">
                    Country:&nbsp;
                    <select
                        onChange={this.onSelect}
                        value={this.props.currentCountry}
                    >
                        <option value="">Select a country:</option>
                        {sortedCountries.map(x => (
                            <option
                                key={x.countryCode}
                                value={x.countryCode}
                            >
                                {x.countryName}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }
    }
}
