import {atom, selector} from 'recoil';

export const todos = atom({
    key:'todos',
    default:[
        {
          title: 'Complete React project',
          description: 'Finish the React project by implementing the remaining features.',
        },
        {
          title: 'Prepare presentation slides',
          description: 'Create slides for the upcoming presentation on the project.',
        },
        {
          title: 'Schedule meeting with client',
          description: 'Arrange a meeting with the client to discuss project progress and updates.',
        },
        {
          title: 'Review code changes',
          description: 'Review and provide feedback on the recent code changes made by team members.',
        },
        {
          title: 'Update documentation',
          description: 'Ensure project documentation is up-to-date with the latest changes.',
        },
        {
          title: 'Research new technologies',
          description: 'Explore and research new technologies that could be beneficial for future projects.',
        },
      ]
});

export const filter = atom({
    key:'filter',
    default:''
});

export const filterSelector = selector({
    key:'filterSelector',
    get:(prop)=>{
        const all_todos = prop.get(todos);
        const my_filter = prop.get(filter).toLowerCase();
        return all_todos.filter(x => (x.title.toLowerCase().includes(my_filter) || x.description.includes(my_filter)))
    }
})