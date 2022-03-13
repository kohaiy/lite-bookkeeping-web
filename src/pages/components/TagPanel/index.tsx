import { Circle, Edit, Favorite, InsertEmoticon } from '@mui/icons-material';
import { Box, Container, Grid, Typography, ButtonBase, useTheme } from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

type TagItem = { id: number; name: string; icon?: string };
interface Props {
    list: TagItem[];
    value?: TagItem['id'];
    onChange?: (id: number) => void;
    onEdit?: () => void;
}

const splitList = (tags: TagItem[], numPerPage = 8) => {
    tags = [...tags, { id: -1, name: '添加' }];
    const list = [];
    while (tags.length) {
        list.push(tags.splice(0, numPerPage));
    }
    return list;
};

const TagPanel: React.FC<Props> = ({ list, value, onChange, onEdit }) => {
    const theme = useTheme();
    const [curIndex, setCurIndex] = useState(0);
    const handleChangeIndex = (index: number) => {
        setCurIndex(index);
    };
    const innerList = splitList(list);

    const handleClick = (tag: TagItem) => {
        if (tag.id < 0) {
            onEdit?.();
            return;
        }
        onChange?.(tag.id);
    };

    return (
        <>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} enableMouseEvents index={curIndex} onChangeIndex={handleChangeIndex}>
                {innerList.map((row, i) => (
                    <Container sx={{ py: 2 }} key={i}>
                        <Grid container spacing={1}>
                            {row.map((tag) => (
                                <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={tag.id}>
                                    <ButtonBase
                                        onClick={() => handleClick(tag)}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 56,
                                            height: 56,
                                            borderRadius: '50%',
                                        }}
                                    >
                                        {tag.id < 0 ? (
                                            <Edit />
                                        ) : (
                                            <InsertEmoticon
                                                fontSize="large"
                                                color="action"
                                                sx={{ borderRadius: '50%', color: value === tag.id ? '#fff' : '', bgcolor: value === tag.id ? 'primary.main' : '' }}
                                            />
                                        )}
                                        <Typography fontSize={12} color={value === tag.id ? 'primary.main' : 'text.disabled'}>
                                            {tag.name}
                                        </Typography>
                                    </ButtonBase>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                ))}
            </SwipeableViews>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {innerList.map((_, i) => (
                    <Typography color={curIndex === i ? 'primary.main' : 'text.disabled'} onClick={() => handleChangeIndex(i)} fontSize={12} padding={0.5} key={i}>
                        {!i ? <Favorite sx={{ fontSize: 12 }} /> : <Circle sx={{ fontSize: 10 }} />}
                    </Typography>
                ))}
            </Box>
        </>
    );
};

export default TagPanel;
