import React from 'react'
import Course from './Course'

const Courses = (props) => {
    const courses = props.courses.map((course) => {    
        console.log("CoursesName",course.name);
        
        return (
            <div key={course.id}>
                <Course course={course} />
            </div>
            
        )
        
    },
    
    )
    return <div>{courses}</div>
    
}
 

export default Courses