import bullsEye from '../assets/Emojis/bulls-eye.webp';
import thumbsup from '../assets/Emojis/thumbs-up.webp';
import meh from '../assets/Emojis/meh.webp';
import { ImageProps, Image } from '@chakra-ui/react';

interface Props {
    rating: number;
}

const Emoji = ({ rating }: Props) => {

    const emojiMap: { [key: number]: ImageProps } = {
        3: {
            src: meh, alt: 'meh', boxSize:
                '25px'
        },
        4: {
            src: thumbsup, alt: 'recommended', boxSize:
                '25px'
        },
        5: {
            src: bullsEye, alt: 'exceptional', boxSize:
                '35px'
        }

    }

    return (
        <Image {...emojiMap[rating]} marginTop={1}/>
    )
}

export default Emoji