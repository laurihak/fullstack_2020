import React from 'react'
import Total from './Total'
import Course from './Course'

const Courses = (props) => {
    const courses = props.courses.map((course, i) => {    
        console.log("CoursesName",course.name);
        
        return (
            <div>
                <Course course={course} key={course.id} />
            </div>
            
        )
        
    },
    
    )
    return <div>{courses}</div>
    
}
 

export default Courses