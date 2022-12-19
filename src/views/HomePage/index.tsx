import { useCallback, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import CardView from "../../components/CardView";
import CustomModal from "../../components/CustomModal/CustomModal";
import GalleryFilters from "../../components/GalleryFilters";
import Header from "../../components/Header";
import { ChasingDotsLoader } from "../../components/Loader/ChasingDotsLoader";
import {
    getAllDataList,
    getAllParams,
    getIsFetchingMore,
    getIsLoading,
} from "../../store/gallery/gallerySelector";
import { setParams } from "../../store/gallery/gallerySlice";
import {
    fetchMoreGalleryData,
    getAllGalleryData,
} from "../../store/gallery/galleryThunk";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { GalleryItem, GetAllGalleryParams } from "../../types";

const HomePage = () => {
    const dispatch = useAppDispatch();
    const params = useAppSelector(getAllParams);
    const isLoading = useAppSelector(getIsLoading);
    const isFetchingMore = useAppSelector(getIsFetchingMore);
    const data = useAppSelector(getAllDataList);
    const [selectedPost, setSelectedPost] = useState<GalleryItem | null>(null)
    const getAllData = async () => {
        await dispatch(getAllGalleryData(params));
    };
    useEffect(() => {
        getAllData();
    }, []);

    const handleOnParamsChange = useCallback(
        async (args: GetAllGalleryParams) => {
            dispatch(setParams(args));
            await dispatch(getAllGalleryData({ ...params, ...args }));
        },
        []
    );

    const handleFetchMore = useCallback(async (args: GetAllGalleryParams) => {
        dispatch(setParams(args));
        await dispatch(fetchMoreGalleryData({ ...params, ...args }));
    }, []);


    return (
        <>
            <div className="">
                <Header />
                <GalleryFilters
                    params={params}
                    handleOnParamsChange={handleOnParamsChange}
                    actions={["section", "sort", "window", "viralFilter"]}
                />
                {!isLoading && (
                    <div className="row">
                        {data?.map((post: GalleryItem) => (
                            <div className='col-md-4' key={post?.id} onClick={() => setSelectedPost(post)}>

                                <CardView post={post} />
                            </div>
                        ))}
                    </div>
                )}
                {!isFetchingMore && !isLoading && (
                    <Waypoint
                        onEnter={() => handleFetchMore({ page: (params?.page || 0) + 1 })}
                    />
                )}
                <ChasingDotsLoader showLoader={isLoading || isFetchingMore} />
            </div>
            {selectedPost && <CustomModal
                show={!!selectedPost}
                onHide={() => setSelectedPost(null)}
                content={<CardView post={selectedPost} showDetails />}
            />}
        </>
    );
};

export default HomePage;
