import React, { useContext, useEffect, useState } from 'react'
import "./TopWinnings.css";
import userService from '../../services/user.service';
import CustomModal from '../common/CustomModal/CustomModal';

function TopWinnings() {
    const [topWinnings, setTopWinnings] = useState([])
    const [openTopWinningsImage, setOpenTopWinningsImage] = useState(false)
    const [opWinningsImage, setTopWinningsImage] = useState('')

    const getTopWinnings = async () => {
        const response = await userService.getTopWinnings()
        if (response && response.data) {
            const winnings = response.data.filter(winning=>{
                const startDate = new Date(winning.start_date);
                const endDate = new Date(winning.end_date);
                const dateToCheck = new Date();
                return (dateToCheck >= startDate && dateToCheck <= endDate)
            }).sort((a, b) => parseInt(a.sequence, 10) - parseInt(b.sequence, 10))
            setTopWinnings(winnings);
        }
    }
    useEffect(() => {
        getTopWinnings()
    }, [])
    
  return (
    <div>
        <div className='top-winnings_container'>
            {
                topWinnings.map(topWinning=>{
                    return (
                        <div className='top-winning'>
                            <div className="top-winning-image_container">
                                <img src={topWinning.image} alt="" 
                                onClick={() => {
                                    setOpenTopWinningsImage(true) 
                                    setTopWinningsImage(topWinning.image)}
                                }
                                style={{
                                    cursor: "pointer"
                                }}
                                />
                            </div>
                            <h3 className="top-winning-title" style={{color: "#FED76E"}}>{topWinning.title}</h3>
                            <button className="top-winning-button" style={{color: "white"}} 
                            onClick={() => {
                                setOpenTopWinningsImage(true) 
                                setTopWinningsImage(topWinning.image)}
                            }
                            >
                                No.{topWinning.sequence}({topWinning.product_name})
                            </button>
                        </div>
                    )
                })
            }
        </div>
        {
            openTopWinningsImage?
            <CustomModal open={true}
            title="Top Winnings"
            onClose={() => setOpenTopWinningsImage(false)}
            style={{
            textAlign: "center",
            borderRadius: "15px",
            padding: "1.5rem 1rem",
            color: "white",
            }}
            containerStyle={{width:"500px", maxWidth:"95%"}}
            >
                <img src={opWinningsImage} alt="" />
            </CustomModal>
            :null
        }
    </div>
  )
}

export default TopWinnings