import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { getAllinterviews } from '../../../redux/actions/InterviewExpAction'

const Paginate = ({ companyName, companyId, page }) => {
    const { numOfPages } = useSelector((state) => state.intExp);
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) {
            dispatch(getAllinterviews(companyId, page));
        }
    }, [dispatch, page]);

    return (
        <Pagination
            count={numOfPages}
            page={Number(page) || 1}
            variant="outlined"
            shape="rounded"
            color="standard"
            renderItem={(item) => (
                <PaginationItem size="large" {...item} component={Link} to={`/interviews/${companyName}/${companyId}?page=${item.page}`} />
            )}
        />
    );
};

export default Paginate;