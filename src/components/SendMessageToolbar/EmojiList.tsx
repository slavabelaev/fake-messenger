import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

interface EmojiGroup {
    title: string,
    items: string[];
}

// Source: https://getemoji.com/
const emojiGroups: EmojiGroup[] = [
    {
        title: 'Smileys and Emotions',
        items: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '☺️', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🥳', '🥴', '🥺', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾']
    },
    {
        title: 'People',
        items: ['👶', '👧', '🧒', '👦', '👩', '🧑', '👨', '👵', '🧓', '👴', '👲', '👳‍♀️', '👳‍♂️', '🧕', '🧔', '👱‍♂️', '👱‍♀️', '👨‍🦰', '👩‍🦰', '👨‍🦱', '👩‍🦱', '👨‍🦲', '👩‍🦲', '👨‍🦳', '👩‍🦳', '🦸‍♀️', '🦸‍♂️', '🦹‍♀️', '🦹‍♂️', '👮‍♀️', '👮‍♂️', '👷‍♀️', '👷‍♂️', '💂‍♀️', '💂‍♂️', '🕵️‍♀️', '🕵️‍♂️', '👩‍⚕️', '👨‍⚕️', '👩‍🌾', '👨‍🌾', '👩‍🍳', '👨‍🍳', '👩‍🎓', '👨‍🎓', '👩‍🎤', '👨‍🎤', '👩‍🏫', '👨‍🏫', '👩‍🏭', '👨‍🏭', '👩‍💻', '👨‍💻', '👩‍💼', '👨‍💼', '👩‍🔧', '👨‍🔧', '👩‍🔬', '👨‍🔬', '👩‍🎨', '👨‍🎨', '👩‍🚒', '👨‍🚒', '👩‍✈️', '👨‍✈️', '👩‍🚀', '👨‍🚀', '👩‍⚖️', '👨‍⚖️', '👰', '🤵', '👸', '🤴', '🤶', '🎅', '🧙‍♀️', '🧙‍♂️', '🧝‍♀️', '🧝‍♂️', '🧛‍♀️', '🧛‍♂️', '🧟‍♀️', '🧟‍♂️', '🧞‍♀️', '🧞‍♂️', '🧜‍♀️', '🧜‍♂️', '🧚‍♀️', '🧚‍♂️', '👼', '🤰', '🤱', '🙇‍♀️', '🙇‍♂️', '💁‍♀️', '💁‍♂️', '🙅‍♀️', '🙅‍♂️', '🙆‍♀️', '🙆‍♂️', '🙋‍♀️', '🙋‍♂️', '🤦‍♀️', '🤦‍♂️', '🤷‍♀️', '🤷‍♂️', '🙎‍♀️', '🙎‍♂️', '🙍‍♀️', '🙍‍♂️', '💇‍♀️', '💇‍♂️', '💆‍♀️', '💆‍♂️', '🧖‍♀️', '🧖‍♂️', '💅', '🤳', '💃', '🕺', '👯‍♀️', '👯‍♂️', '🕴', '🚶‍♀️', '🚶‍♂️', '🏃‍♀️', '🏃‍♂️', '👫', '👭', '👬', '💑', '👩‍❤️‍👩', '👨‍❤️‍👨', '💏', '👩‍❤️‍💋‍👩', '👨‍❤️‍💋‍👨', '👪', '👨‍👩‍👧', '👨‍👩‍👧‍👦', '👨‍👩‍👦‍👦', '👨‍👩‍👧‍👧', '👩‍👩‍👦', '👩‍👩‍👧', '👩‍👩‍👧‍👦', '👩‍👩‍👦‍👦', '👩‍👩‍👧‍👧', '👨‍👨‍👦', '👨‍👨‍👧', '👨‍👨‍👧‍👦', '👨‍👨‍👦‍👦', '👨‍👨‍👧‍👧', '👩‍👦', '👩‍👧', '👩‍👧‍👦', '👩‍👦‍👦', '👩‍👧‍👧', '👨‍👦', '👨‍👧', '👨‍👧‍👦', '👨‍👦‍👦', '👨‍👧‍👧', '🤲', '👐', '🙌', '👏', '🤝', '👍', '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤟', '🤘', '👌', '👈', '👉', '👆', '👇', '☝️', '✋', '🤚', '🖐', '🖖', '👋', '🤙', '💪', '🦵', '🦶', '🖕', '✍️', '🙏', '💍', '💄', '💋', '👄', '👅', '👂', '👃', '👣', '👁', '👀', '🧠', '🦴', '🦷', '🗣', '👤', '👥']
    },
    {
        title: 'Pale',
        items: ['👶🏻', '👦🏻', '👧🏻', '👨🏻', '👩🏻', '👱🏻‍♀️', '👱🏻', '👴🏻', '👵🏻', '👲🏻', '👳🏻‍♀️', '👳🏻', '👮🏻‍♀️', '👮🏻', '👷🏻‍♀️', '👷🏻', '💂🏻‍♀️', '💂🏻', '🕵🏻‍♀️', '🕵🏻', '👩🏻‍⚕️', '👨🏻‍⚕️', '👩🏻‍🌾', '👨🏻‍🌾', '👩🏻‍🍳', '👨🏻‍🍳', '👩🏻‍🎓', '👨🏻‍🎓', '👩🏻‍🎤', '👨🏻‍🎤', '👩🏻‍🏫', '👨🏻‍🏫', '👩🏻‍🏭', '👨🏻‍🏭', '👩🏻‍💻', '👨🏻‍💻', '👩🏻‍💼', '👨🏻‍💼', '👩🏻‍🔧', '👨🏻‍🔧', '👩🏻‍🔬', '👨🏻‍🔬', '👩🏻‍🎨', '👨🏻‍🎨', '👩🏻‍🚒', '👨🏻‍🚒', '👩🏻‍✈️', '👨🏻‍✈️', '👩🏻‍🚀', '👨🏻‍🚀', '👩🏻‍⚖️', '👨🏻‍⚖️', '🤶🏻', '🎅🏻', '👸🏻', '🤴🏻', '👰🏻', '🤵🏻', '👼🏻', '🤰🏻', '🙇🏻‍♀️', '🙇🏻', '💁🏻', '💁🏻‍♂️', '🙅🏻', '🙅🏻‍♂️', '🙆🏻', '🙆🏻‍♂️', '🙋🏻', '🙋🏻‍♂️', '🤦🏻‍♀️', '🤦🏻‍♂️', '🤷🏻‍♀️', '🤷🏻‍♂️', '🙎🏻', '🙎🏻‍♂️', '🙍🏻', '🙍🏻‍♂️', '💇🏻', '💇🏻‍♂️', '💆🏻', '💆🏻‍♂️', '🕴🏻', '💃🏻', '🕺🏻', '🚶🏻‍♀️', '🚶🏻', '🏃🏻‍♀️', '🏃🏻', '🤲🏻', '👐🏻', '🙌🏻', '👏🏻', '🙏🏻', '👍🏻', '👎🏻', '👊🏻', '✊🏻', '🤛🏻', '🤜🏻', '🤞🏻', '✌🏻', '🤟🏻', '🤘🏻', '👌🏻', '👈🏻', '👉🏻', '👆🏻', '👇🏻', '☝🏻', '✋🏻', '🤚🏻', '🖐🏻', '🖖🏻', '👋🏻', '🤙🏻', '💪🏻', '🖕🏻', '✍🏻', '🤳🏻', '💅🏻', '👂🏻', '👃🏻']
    },
    {
        title: 'Cream White',
        items: ['👶🏼', '👦🏼', '👧🏼', '👨🏼', '👩🏼', '👱🏼‍♀️', '👱🏼', '👴🏼', '👵🏼', '👲🏼', '👳🏼‍♀️', '👳🏼', '👮🏼‍♀️', '👮🏼', '👷🏼‍♀️', '👷🏼', '💂🏼‍♀️', '💂🏼', '🕵🏼‍♀️', '🕵🏼', '👩🏼‍⚕️', '👨🏼‍⚕️', '👩🏼‍🌾', '👨🏼‍🌾', '👩🏼‍🍳', '👨🏼‍🍳', '👩🏼‍🎓', '👨🏼‍🎓', '👩🏼‍🎤', '👨🏼‍🎤', '👩🏼‍🏫', '👨🏼‍🏫', '👩🏼‍🏭', '👨🏼‍🏭', '👩🏼‍💻', '👨🏼‍💻', '👩🏼‍💼', '👨🏼‍💼', '👩🏼‍🔧', '👨🏼‍🔧', '👩🏼‍🔬', '👨🏼‍🔬', '👩🏼‍🎨', '👨🏼‍🎨', '👩🏼‍🚒', '👨🏼‍🚒', '👩🏼‍✈️', '👨🏼‍✈️', '👩🏼‍🚀', '👨🏼‍🚀', '👩🏼‍⚖️', '👨🏼‍⚖️', '🤶🏼', '🎅🏼', '👸🏼', '🤴🏼', '👰🏼', '🤵🏼', '👼🏼', '🤰🏼', '🙇🏼‍♀️', '🙇🏼', '💁🏼', '💁🏼‍♂️', '🙅🏼', '🙅🏼‍♂️', '🙆🏼', '🙆🏼‍♂️', '🙋🏼', '🙋🏼‍♂️', '🤦🏼‍♀️', '🤦🏼‍♂️', '🤷🏼‍♀️', '🤷🏼‍♂️', '🙎🏼', '🙎🏼‍♂️', '🙍🏼', '🙍🏼‍♂️', '💇🏼', '💇🏼‍♂️', '💆🏼', '💆🏼‍♂️', '🕴🏼', '💃🏼', '🕺🏼', '🚶🏼‍♀️', '🚶🏼', '🏃🏼‍♀️', '🏃🏼', '🤲🏼', '👐🏼', '🙌🏼', '👏🏼', '🙏🏼', '👍🏼', '👎🏼', '👊🏼', '✊🏼', '🤛🏼', '🤜🏼', '🤞🏼', '✌🏼', '🤟🏼', '🤘🏼', '👌🏼', '👈🏼', '👉🏼', '👆🏼', '👇🏼', '☝🏼', '✋🏼', '🤚🏼', '🖐🏼', '🖖🏼', '👋🏼', '🤙🏼', '💪🏼', '🖕🏼', '✍🏼', '🤳🏼', '💅🏼', '👂🏼', '👃🏼']
    },
    {
        title: 'Moderate Brown',
        items: ['👶🏽', '👦🏽', '👧🏽', '👨🏽', '👩🏽', '👱🏽‍♀️', '👱🏽', '👴🏽', '👵🏽', '👲🏽', '👳🏽‍♀️', '👳🏽', '👮🏽‍♀️', '👮🏽', '👷🏽‍♀️', '👷🏽', '💂🏽‍♀️', '💂🏽', '🕵🏽‍♀️', '🕵🏽', '👩🏽‍⚕️', '👨🏽‍⚕️', '👩🏽‍🌾', '👨🏽‍🌾', '👩🏽‍🍳', '👨🏽‍🍳', '👩🏽‍🎓', '👨🏽‍🎓', '👩🏽‍🎤', '👨🏽‍🎤', '👩🏽‍🏫', '👨🏽‍🏫', '👩🏽‍🏭', '👨🏽‍🏭', '👩🏽‍💻', '👨🏽‍💻', '👩🏽‍💼', '👨🏽‍💼', '👩🏽‍🔧', '👨🏽‍🔧', '👩🏽‍🔬', '👨🏽‍🔬', '👩🏽‍🎨', '👨🏽‍🎨', '👩🏽‍🚒', '👨🏽‍🚒', '👩🏽‍✈️', '👨🏽‍✈️', '👩🏽‍🚀', '👨🏽‍🚀', '👩🏽‍⚖️', '👨🏽‍⚖️', '🤶🏽', '🎅🏽', '👸🏽', '🤴🏽', '👰🏽', '🤵🏽', '👼🏽', '🤰🏽', '🙇🏽‍♀️', '🙇🏽', '💁🏽', '💁🏽‍♂️', '🙅🏽', '🙅🏽‍♂️', '🙆🏽', '🙆🏽‍♂️', '🙋🏽', '🙋🏽‍♂️', '🤦🏽‍♀️', '🤦🏽‍♂️', '🤷🏽‍♀️', '🤷🏽‍♂️', '🙎🏽', '🙎🏽‍♂️', '🙍🏽', '🙍🏽‍♂️', '💇🏽', '💇🏽‍♂️', '💆🏽', '💆🏽‍♂️', '🕴🏼', '💃🏽', '🕺🏽', '🚶🏽‍♀️', '🚶🏽', '🏃🏽‍♀️', '🏃🏽', '🤲🏽', '👐🏽', '🙌🏽', '👏🏽', '🙏🏽', '👍🏽', '👎🏽', '👊🏽', '✊🏽', '🤛🏽', '🤜🏽', '🤞🏽', '✌🏽', '🤟🏽', '🤘🏽', '👌🏽', '👈🏽', '👉🏽', '👆🏽', '👇🏽', '☝🏽', '✋🏽', '🤚🏽', '🖐🏽', '🖖🏽', '👋🏽', '🤙🏽', '💪🏽', '🖕🏽', '✍🏽', '🤳🏽', '💅🏽', '👂🏽', '👃🏽']
    },
    {
        title: 'Dark Brown',
        items: ['👶🏾', '👦🏾', '👧🏾', '👨🏾', '👩🏾', '👱🏾‍♀️', '👱🏾', '👴🏾', '👵🏾', '👲🏾', '👳🏾‍♀️', '👳🏾', '👮🏾‍♀️', '👮🏾', '👷🏾‍♀️', '👷🏾', '💂🏾‍♀️', '💂🏾', '🕵🏾‍♀️', '🕵🏾', '👩🏾‍⚕️', '👨🏾‍⚕️', '👩🏾‍🌾', '👨🏾‍🌾', '👩🏾‍🍳', '👨🏾‍🍳', '👩🏾‍🎓', '👨🏾‍🎓', '👩🏾‍🎤', '👨🏾‍🎤', '👩🏾‍🏫', '👨🏾‍🏫', '👩🏾‍🏭', '👨🏾‍🏭', '👩🏾‍💻', '👨🏾‍💻', '👩🏾‍💼', '👨🏾‍💼', '👩🏾‍🔧', '👨🏾‍🔧', '👩🏾‍🔬', '👨🏾‍🔬', '👩🏾‍🎨', '👨🏾‍🎨', '👩🏾‍🚒', '👨🏾‍🚒', '👩🏾‍✈️', '👨🏾‍✈️', '👩🏾‍🚀', '👨🏾‍🚀', '👩🏾‍⚖️', '👨🏾‍⚖️', '🤶🏾', '🎅🏾', '👸🏾', '🤴🏾', '👰🏾', '🤵🏾', '👼🏾', '🤰🏾', '🙇🏾‍♀️', '🙇🏾', '💁🏾', '💁🏾‍♂️', '🙅🏾', '🙅🏾‍♂️', '🙆🏾', '🙆🏾‍♂️', '🙋🏾', '🙋🏾‍♂️', '🤦🏾‍♀️', '🤦🏾‍♂️', '🤷🏾‍♀️', '🤷🏾‍♂️', '🙎🏾', '🙎🏾‍♂️', '🙍🏾', '🙍🏾‍♂️', '💇🏾', '💇🏾‍♂️', '💆🏾', '💆🏾‍♂️', '🕴🏾', '💃🏾', '🕺🏾', '🚶🏾‍♀️', '🚶🏾', '🏃🏾‍♀️', '🏃🏾', '🤲🏾', '👐🏾', '🙌🏾', '👏🏾', '🙏🏾', '👍🏾', '👎🏾', '👊🏾', '✊🏾', '🤛🏾', '🤜🏾', '🤞🏾', '✌🏾', '🤟🏾', '🤘🏾', '👌🏾', '👈🏾', '👉🏾', '👆🏾', '👇🏾', '☝🏾', '✋🏾', '🤚🏾', '🖐🏾', '🖖🏾', '👋🏾', '🤙🏾', '💪🏾', '🖕🏾', '✍🏾', '🤳🏾', '💅🏾', '👂🏾', '👃🏾']
    },
    {
        title: 'Black',
        items: ['👶🏿', '👦🏿', '👧🏿', '👨🏿', '👩🏿', '👱🏿‍♀️', '👱🏿', '👴🏿', '👵🏿', '👲🏿', '👳🏿‍♀️', '👳🏿', '👮🏿‍♀️', '👮🏿', '👷🏿‍♀️', '👷🏿', '💂🏿‍♀️', '💂🏿', '🕵🏿‍♀️', '🕵🏿', '👩🏿‍⚕️', '👨🏿‍⚕️', '👩🏿‍🌾', '👨🏿‍🌾', '👩🏿‍🍳', '👨🏿‍🍳', '👩🏿‍🎓', '👨🏿‍🎓', '👩🏿‍🎤', '👨🏿‍🎤', '👩🏿‍🏫', '👨🏿‍🏫', '👩🏿‍🏭', '👨🏿‍🏭', '👩🏿‍💻', '👨🏿‍💻', '👩🏿‍💼', '👨🏿‍💼', '👩🏿‍🔧', '👨🏿‍🔧', '👩🏿‍🔬', '👨🏿‍🔬', '👩🏿‍🎨', '👨🏿‍🎨', '👩🏿‍🚒', '👨🏿‍🚒', '👩🏿‍✈️', '👨🏿‍✈️', '👩🏿‍🚀', '👨🏿‍🚀', '👩🏿‍⚖️', '👨🏿‍⚖️', '🤶🏿', '🎅🏿', '👸🏿', '🤴🏿', '👰🏿', '🤵🏿', '👼🏿', '🤰🏿', '🙇🏿‍♀️', '🙇🏿', '💁🏿', '💁🏿‍♂️', '🙅🏿', '🙅🏿‍♂️', '🙆🏿', '🙆🏿‍♂️', '🙋🏿', '🙋🏿‍♂️', '🤦🏿‍♀️', '🤦🏿‍♂️', '🤷🏿‍♀️', '🤷🏿‍♂️', '🙎🏿', '🙎🏿‍♂️', '🙍🏿', '🙍🏿‍♂️', '💇🏿', '💇🏿‍♂️', '💆🏿', '💆🏿‍♂️', '🕴🏿', '💃🏿', '🕺🏿', '🚶🏿‍♀️', '🚶🏿', '🏃🏿‍♀️', '🏃🏿', '🤲🏿', '👐🏿', '🙌🏿', '👏🏿', '🙏🏿', '👍🏿', '👎🏿', '👊🏿', '✊🏿', '🤛🏿', '🤜🏿', '🤞🏿', '✌🏿', '🤟🏿', '🤘🏿', '👌🏿', '👈🏿', '👉🏿', '👆🏿', '👇🏿', '☝🏿', '✋🏿', '🤚🏿', '🖐🏿', '🖖🏿', '👋🏿', '🤙🏿', '💪🏿', '🖕🏿', '✍🏿', '🤳🏿', '💅🏿', '👂🏿', '👃🏿']
    },
    {
        title: 'Animals And Nature',
        items: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🦝', '🐻', '🐼', '🦘', '🦡', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦢', '🦅', '🦉', '🦚', '🦜', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐚', '🐞', '🐜', '🦗', '🕷', '🕸', '🦂', '🦟', '🦠', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🐘', '🦏', '🦛', '🐪', '🐫', '🦙', '🦒', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🐐', '🦌', '🐕', '🐩', '🐈', '🐓', '🦃', '🕊', '🐇', '🐁', '🐀', '🐿', '🦔', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🎋', '🍃', '🍂', '🍁', '🍄', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍', '🌏', '💫', '⭐️', '🌟', '✨', '⚡️', '☄️', '💥', '🔥', '🌪', '🌈', '☀️', '🌤', '⛅️', '🌥', '☁️', '🌦', '🌧', '⛈', '🌩', '🌨', '❄️', '☃️', '⛄️', '🌬', '💨', '💧', '💦', '☔️', '☂️', '🌊', '🌫']
    },
    {
        title: 'Food and Drink',
        items: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🥭', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥒', '🥬', '🌶', '🌽', '🥕', '🥔', '🍠', '🥐', '🍞', '🥖', '🥨', '🥯', '🧀', '🥚', '🍳', '🥞', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🍤', '🍙', '🍚', '🍘', '🍥', '🥮', '🥠', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🧂', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕️', '🍵', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🍾', '🥄', '🍴', '🍽', '🥣', '🥡', '🥢']
    },
    {
        title: 'Travel and Places',
        items: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫', '🛬', '🛩', '💺', '🛰', '🚀', '🛸', '🚁', '🛶', '⛵️', '🚤', '🛥', '🛳', '⛴', '🚢', '⚓️', '⛽️', '🚧', '🚦', '🚥', '🚏', '🗺', '🗿', '🗽', '🗼', '🏰', '🏯', '🏟', '🎡', '🎢', '🎠', '⛲️', '⛱', '🏖', '🏝', '🏜', '🌋', '⛰', '🏔', '🗻', '🏕', '⛺️', '🏠', '🏡', '🏘', '🏚', '🏗', '🏭', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛', '⛪️', '🕌', '🕍', '🕋', '⛩', '🛤', '🛣', '🗾', '🎑', '🏞', '🌅', '🌄', '🌠', '🎇', '🎆', '🌇', '🌆', '🏙', '🌃', '🌌', '🌉', '🌁']
    },
    {
        title: 'Activities and Events',
        items: ['⚽️', '🏀', '🏈', '⚾️', '🥎', '🏐', '🏉', '🎾', '🥏', '🎱', '🏓', '🏸', '🥅', '🏒', '🏑', '🥍', '🏏', '⛳️', '🏹', '🎣', '🥊', '🥋', '🎽', '⛸', '🥌', '🛷', '🛹', '🎿', '⛷', '🏂', '🏋️‍♀️', '🏋🏻‍♀️', '🏋🏼‍♀️', '🏋🏽‍♀️', '🏋🏾‍♀️', '🏋🏿‍♀️', '🏋️‍♂️', '🏋🏻‍♂️', '🏋🏼‍♂️', '🏋🏽‍♂️', '🏋🏾‍♂️', '🏋🏿‍♂️', '🤼‍♀️', '🤼‍♂️', '🤸‍♀️', '🤸🏻‍♀️', '🤸🏼‍♀️', '🤸🏽‍♀️', '🤸🏾‍♀️', '🤸🏿‍♀️', '🤸‍♂️', '🤸🏻‍♂️', '🤸🏼‍♂️', '🤸🏽‍♂️', '🤸🏾‍♂️', '🤸🏿‍♂️', '⛹️‍♀️', '⛹🏻‍♀️', '⛹🏼‍♀️', '⛹🏽‍♀️', '⛹🏾‍♀️', '⛹🏿‍♀️', '⛹️‍♂️', '⛹🏻‍♂️', '⛹🏼‍♂️', '⛹🏽‍♂️', '⛹🏾‍♂️', '⛹🏿‍♂️', '🤺', '🤾‍♀️', '🤾🏻‍♀️', '🤾🏼‍♀️', '🤾🏾‍♀️', '🤾🏾‍♀️', '🤾🏿‍♀️', '🤾‍♂️', '🤾🏻‍♂️', '🤾🏼‍♂️', '🤾🏽‍♂️', '🤾🏾‍♂️', '🤾🏿‍♂️', '🏌️‍♀️', '🏌🏻‍♀️', '🏌🏼‍♀️', '🏌🏽‍♀️', '🏌🏾‍♀️', '🏌🏿‍♀️', '🏌️‍♂️', '🏌🏻‍♂️', '🏌🏼‍♂️', '🏌🏽‍♂️', '🏌🏾‍♂️', '🏌🏿‍♂️', '🏇', '🏇🏻', '🏇🏼', '🏇🏽', '🏇🏾', '🏇🏿', '🧘‍♀️', '🧘🏻‍♀️', '🧘🏼‍♀️', '🧘🏽‍♀️', '🧘🏾‍♀️', '🧘🏿‍♀️', '🧘‍♂️', '🧘🏻‍♂️', '🧘🏼‍♂️', '🧘🏽‍♂️', '🧘🏾‍♂️', '🧘🏿‍♂️', '🏄‍♀️', '🏄🏻‍♀️', '🏄🏼‍♀️', '🏄🏽‍♀️', '🏄🏾‍♀️', '🏄🏿‍♀️', '🏄‍♂️', '🏄🏻‍♂️', '🏄🏼‍♂️', '🏄🏽‍♂️', '🏄🏾‍♂️', '🏄🏿‍♂️', '🏊‍♀️', '🏊🏻‍♀️', '🏊🏼‍♀️', '🏊🏽‍♀️', '🏊🏾‍♀️', '🏊🏿‍♀️', '🏊‍♂️', '🏊🏻‍♂️', '🏊🏼‍♂️', '🏊🏽‍♂️', '🏊🏾‍♂️', '🏊🏿‍♂️', '🤽‍♀️', '🤽🏻‍♀️', '🤽🏼‍♀️', '🤽🏽‍♀️', '🤽🏾‍♀️', '🤽🏿‍♀️', '🤽‍♂️', '🤽🏻‍♂️', '🤽🏼‍♂️', '🤽🏽‍♂️', '🤽🏾‍♂️', '🤽🏿‍♂️', '🚣‍♀️', '🚣🏻‍♀️', '🚣🏼‍♀️', '🚣🏽‍♀️', '🚣🏾‍♀️', '🚣🏿‍♀️', '🚣‍♂️', '🚣🏻‍♂️', '🚣🏼‍♂️', '🚣🏽‍♂️', '🚣🏾‍♂️', '🚣🏿‍♂️', '🧗‍♀️', '🧗🏻‍♀️', '🧗🏼‍♀️', '🧗🏽‍♀️', '🧗🏾‍♀️', '🧗🏿‍♀️', '🧗‍♂️', '🧗🏻‍♂️', '🧗🏼‍♂️', '🧗🏽‍♂️', '🧗🏾‍♂️', '🧗🏿‍♂️', '🚵‍♀️', '🚵🏻‍♀️', '🚵🏼‍♀️', '🚵🏽‍♀️', '🚵🏾‍♀️', '🚵🏿‍♀️', '🚵‍♂️', '🚵🏻‍♂️', '🚵🏼‍♂️', '🚵🏽‍♂️', '🚵🏾‍♂️', '🚵🏿‍♂️', '🚴‍♀️', '🚴🏻‍♀️', '🚴🏼‍♀️', '🚴🏽‍♀️', '🚴🏾‍♀️', '🚴🏿‍♀️', '🚴‍♂️', '🚴🏻‍♂️', '🚴🏼‍♂️', '🚴🏽‍♂️', '🚴🏾‍♂️', '🚴🏿‍♂️', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖', '🏵', '🎗', '🎫', '🎟', '🎪', '🤹‍♀️', '🤹🏻‍♀️', '🤹🏼‍♀️', '🤹🏽‍♀️', '🤹🏾‍♀️', '🤹🏿‍♀️', '🤹‍♂️', '🤹🏻‍♂️', '🤹🏼‍♂️', '🤹🏽‍♂️', '🤹🏾‍♂️', '🤹🏿‍♂️', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🎻', '🎲', '🧩', '♟', '🎯', '🎳', '🎮', '🎰']
    },
    {
        title: 'Objects',
        items: ['⌚️', '📱', '📲', '💻', '⌨️', '🖥', '🖨', '🖱', '🖲', '🕹', '🗜', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽', '🎞', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙', '🎚', '🎛', '⏱', '⏲', '⏰', '🕰', '⌛️', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯', '🗑', '🛢', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '🧾', '💎', '⚖️', '🔧', '🔨', '⚒', '🛠', '⛏', '🔩', '⚙️', '⛓', '🔫', '💣', '🔪', '🗡', '⚔️', '🛡', '🚬', '⚰️', '⚱️', '🏺', '🧭', '🧱', '🔮', '🧿', '🧸', '📿', '💈', '⚗️', '🔭', '🧰', '🧲', '🧪', '🧫', '🧬', '🧯', '🔬', '🕳', '💊', '💉', '🌡', '🚽', '🚰', '🚿', '🛁', '🛀', '🛀🏻', '🛀🏼', '🛀🏽', '🛀🏾', '🛀🏿', '🧴', '🧵', '🧶', '🧷', '🧹', '🧺', '🧻', '🧼', '🧽', '🛎', '🔑', '🗝', '🚪', '🛋', '🛏', '🛌', '🖼', '🛍', '🧳', '🛒', '🎁', '🎈', '🎏', '🎀', '🎊', '🎉', '🧨', '🎎', '🏮', '🎐', '🧧', '✉️', '📩', '📨', '📧', '💌', '📥', '📤', '📦', '🏷', '📪', '📫', '📬', '📭', '📮', '📯', '📜', '📃', '📄', '📑', '📊', '📈', '📉', '🗒', '🗓', '📆', '📅', '📇', '🗃', '🗳', '🗄', '📋', '📁', '📂', '🗂', '🗞', '📰', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🔗', '📎', '🖇', '📐', '📏', '📌', '📍', '✂️', '🖊', '🖋', '✒️', '🖌', '🖍', '📝', '✏️', '🔍', '🔎', '🔏', '🔐', '🔒', '🔓']
    },
    {
        title: 'Clothing and Accessories',
        items: ['🧥', '👚', '👕', '👖', '👔', '👗', '👙', '👘', '👠', '👡', '👢', '👞', '👟', '🥾', '🥿', '🧦', '🧤', '🧣', '🎩', '🧢', '👒', '🎓', '⛑', '👑', '👝', '👛', '👜', '💼', '🎒', '👓', '🕶', '🥽', '🥼', '🌂', '🧵', '🧶']
    },
    {
        title: 'Symbols',
        items: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈️', '♉️', '♊️', '♋️', '♌️', '♍️', '♎️', '♏️', '♐️', '♑️', '♒️', '♓️', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚️', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕️', '🛑', '⛔️', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗️', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯️', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '🚾', '♿️', '🅿️', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '⏏️', '▶️', '⏸', '⏯', '⏹', '⏺', '⏭', '⏮', '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '♾', '💲', '💱', '™️', '©️', '®️', '〰️', '➰', '➿', '🔚', '🔙', '🔛', '🔝', '🔜', '✔️', '☑️', '🔘', '⚪️', '⚫️', '🔴', '🔵', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾️', '◽️', '◼️', '◻️', '⬛️', '⬜️', '🔈', '🔇', '🔉', '🔊', '🔔', '🔕', '📣', '📢', '👁‍🗨', '💬', '💭', '🗯', '♠️', '♣️', '♥️', '♦️', '🃏', '🎴', '🀄️', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧']
    },
    {
        title: 'Flags',
        items: ['🏳️', '🏴', '🏁', '🚩', '🏳️‍🌈', '🏴‍☠️', '🇦🇫', '🇦🇽', '🇦🇱', '🇩🇿', '🇦🇸', '🇦🇩', '🇦🇴', '🇦🇮', '🇦🇶', '🇦🇬', '🇦🇷', '🇦🇲', '🇦🇼', '🇦🇺', '🇦🇹', '🇦🇿', '🇧🇸', '🇧🇭', '🇧🇩', '🇧🇧', '🇧🇾', '🇧🇪', '🇧🇿', '🇧🇯', '🇧🇲', '🇧🇹', '🇧🇴', '🇧🇦', '🇧🇼', '🇧🇷', '🇮🇴', '🇻🇬', '🇧🇳', '🇧🇬', '🇧🇫', '🇧🇮', '🇰🇭', '🇨🇲', '🇨🇦', '🇮🇨', '🇨🇻', '🇧🇶', '🇰🇾', '🇨🇫', '🇹🇩', '🇨🇱', '🇨🇳', '🇨🇽', '🇨🇨', '🇨🇴', '🇰🇲', '🇨🇬', '🇨🇩', '🇨🇰', '🇨🇷', '🇨🇮', '🇭🇷', '🇨🇺', '🇨🇼', '🇨🇾', '🇨🇿', '🇩🇰', '🇩🇯', '🇩🇲', '🇩🇴', '🇪🇨', '🇪🇬', '🇸🇻', '🇬🇶', '🇪🇷', '🇪🇪', '🇪🇹', '🇪🇺', '🇫🇰', '🇫🇴', '🇫🇯', '🇫🇮', '🇫🇷', '🇬🇫', '🇵🇫', '🇹🇫', '🇬🇦', '🇬🇲', '🇬🇪', '🇩🇪', '🇬🇭', '🇬🇮', '🇬🇷', '🇬🇱', '🇬🇩', '🇬🇵', '🇬🇺', '🇬🇹', '🇬🇬', '🇬🇳', '🇬🇼', '🇬🇾', '🇭🇹', '🇭🇳', '🇭🇰', '🇭🇺', '🇮🇸', '🇮🇳', '🇮🇩', '🇮🇷', '🇮🇶', '🇮🇪', '🇮🇲', '🇮🇱', '🇮🇹', '🇯🇲', '🇯🇵', '🎌', '🇯🇪', '🇯🇴', '🇰🇿', '🇰🇪', '🇰🇮', '🇽🇰', '🇰🇼', '🇰🇬', '🇱🇦', '🇱🇻', '🇱🇧', '🇱🇸', '🇱🇷', '🇱🇾', '🇱🇮', '🇱🇹', '🇱🇺', '🇲🇴', '🇲🇰', '🇲🇬', '🇲🇼', '🇲🇾', '🇲🇻', '🇲🇱', '🇲🇹', '🇲🇭', '🇲🇶', '🇲🇷', '🇲🇺', '🇾🇹', '🇲🇽', '🇫🇲', '🇲🇩', '🇲🇨', '🇲🇳', '🇲🇪', '🇲🇸', '🇲🇦', '🇲🇿', '🇲🇲', '🇳🇦', '🇳🇷', '🇳🇵', '🇳🇱', '🇳🇨', '🇳🇿', '🇳🇮', '🇳🇪', '🇳🇬', '🇳🇺', '🇳🇫', '🇰🇵', '🇲🇵', '🇳🇴', '🇴🇲', '🇵🇰', '🇵🇼', '🇵🇸', '🇵🇦', '🇵🇬', '🇵🇾', '🇵🇪', '🇵🇭', '🇵🇳', '🇵🇱', '🇵🇹', '🇵🇷', '🇶🇦', '🇷🇪', '🇷🇴', '🇷🇺', '🇷🇼', '🇼🇸', '🇸🇲', '🇸🇦', '🇸🇳', '🇷🇸', '🇸🇨', '🇸🇱', '🇸🇬', '🇸🇽', '🇸🇰', '🇸🇮', '🇬🇸', '🇸🇧', '🇸🇴', '🇿🇦', '🇰🇷', '🇸🇸', '🇪🇸', '🇱🇰', '🇧🇱', '🇸🇭', '🇰🇳', '🇱🇨', '🇵🇲', '🇻🇨', '🇸🇩', '🇸🇷', '🇸🇿', '🇸🇪', '🇨🇭', '🇸🇾', '🇹🇼', '🇹🇯', '🇹🇿', '🇹🇭', '🇹🇱', '🇹🇬', '🇹🇰', '🇹🇴', '🇹🇹', '🇹🇳', '🇹🇷', '🇹🇲', '🇹🇨', '🇹🇻', '🇻🇮', '🇺🇬', '🇺🇦', '🇦🇪', '🇬🇧', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', '🏴󠁧󠁢󠁷󠁬󠁳󠁿', '🇺🇳', '🇺🇸', '🇺🇾', '🇺🇿', '🇻🇺', '🇻🇦', '🇻🇪', '🇻🇳', '🇼🇫', '🇪🇭', '🇾🇪', '🇿🇲', '🇿🇼']
    },
    {
        title: 'New',
        items: ['🥱', '🤏', '🦾', '🦿', '🦻', '🧏', '🧏‍♂️', '🧏‍♀️', '🧍', '🧍‍♂️', '🧍‍♀️', '🧎', '🧎‍♂️', '🧎‍♀️', '👨‍🦯', '👩‍🦯', '👨‍🦼', '👩‍🦼', '👨‍🦽', '👩‍🦽', '🦧', '🦮', '🐕‍🦺', '🦥', '🦦', '🦨', '🦩', '🧄', '🧅', '🧇', '🧆', '🧈', '🦪', '🧃', '🧉', '🧊', '🛕', '🦽', '🦼', '🛺', '🪂', '🪐', '🤿', '🪀', '🪁', '🦺', '🥻', '🩱', '🩲', '🩳', '🩰', '🪕', '🪔', '🪓', '🦯', '🩸', '🩹', '🩺', '🪑', '🪒', '🤎', '🤍', '🟠', '🟡', '🟢', '🟣', '🟤', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟫']
    }
];

export interface EmojiListProps {
    onClick?: (emoji: string) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    group: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 32px)'
    },
    item: {
        fontSize: theme.spacing(3),
        cursor: 'pointer',
    }
}));

function EmojiList({ onClick }: EmojiListProps) {
    const classes = useStyles();

    const renderItem = (emoji: string) => (
        <span
            className={classes.item}
            role="button"
            onClick={() => onClick && onClick(emoji)}
        >
            {emoji}
        </span>
    );

    const renderGroup = (emojiGroup: EmojiGroup) => (
        <div>
            <Toolbar
                variant="dense"
                disableGutters
            >
                <Typography
                    variant="overline"
                >
                    {emojiGroup.title}
                </Typography>
            </Toolbar>
            <Container disableGutters>
                <div className={classes.group}>
                    {emojiGroup.items.map(renderItem)}
                </div>
            </Container>
        </div>
    );

    return (
        <div>
            {emojiGroups.map(renderGroup)}
        </div>
    )
}

export default EmojiList;
