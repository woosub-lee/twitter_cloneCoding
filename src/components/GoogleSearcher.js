import React, { useState } from "react";

const GoogleSearcher = () => {
    const [word, setWord] = useState("");
    const onChange = (event) => {
        const { target: {value}} = event;
        setWord(value);
    }
    const onSubmit = async (event) => {
        if (word === "") {
            return;
        }
        event.preventDefault();
        window.open(`https://www.google.com/search?sxsrf=ALeKk00bq1tLl1sofG2ENnxw8iOT2eln0Q%3A1608644757501&source=hp&ei=lfjhX7_kG8Xh-Ab6u4TYCg&q=${word}&gs_lcp=CgZwc3ktYWIQAxgAMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnUABYAGDnE2gBcAB4AIABAIgBAJIBAJgBAKoBB2d3cy13aXqwAQo&sclient=psy-ab`,"_self");
    }
    return (
        <form onSubmit={onSubmit} className="writerForm">
            <div className="writerInput__container">
                <input
                    className="writerInput__input"
                    value={word}
                    onChange={onChange}
                    type="text"
                    placeholder="Google Search"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="writerInput__arrow" />
            </div>
        </form>
    );
}
export default GoogleSearcher;