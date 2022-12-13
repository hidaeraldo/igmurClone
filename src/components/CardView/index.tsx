import { ArrowFatDown, ArrowFatUp, Eye } from "phosphor-react"
import { Dispatch, SetStateAction } from "react"
import { GalleryItem } from "../../types"
import './index.scss'
interface CardViewProps {
    post: GalleryItem
    showDetails?: boolean
}

const CardView = ({ post, showDetails = false }: CardViewProps) => {
    return (
        <div className="card post-wrapper">
            <div className="post-view-wrapper">
                {post?.images_count >= 1 &&
                    <>
                        {post?.images[0].type.includes('video') ?
                            <video preload="auto" autoPlay loop>
                                <source src={post?.images[0].mp4} type="video/mp4"></source>
                            </video>
                            : <img className="card-img-top" src={post?.images[0]?.link} referrerPolicy="no-referrer" />
                        }
                    </>}
            </div>

            <div className="card-body">
                <h5 className="post-title-text">{post?.title}</h5>
                {showDetails &&
                    <div>
                        <h6>{post?.description}</h6>
                        <div className="d-flex">
                            <div className="me-3">
                                <ArrowFatUp size={25} weight="fill" /> {post?.ups}  <ArrowFatDown size={25} className='ms-3' weight="fill" /> {post?.downs}
                            </div>
                            <div>
                                <Eye size={25} weight="fill" /> {post?.score}
                            </div>
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}

export default CardView
