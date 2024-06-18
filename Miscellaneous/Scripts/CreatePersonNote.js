module.exports = async (params) => {
    const {
        quickAddApi: { inputPrompt },
    } = params;

    try {
        const now = window.moment();
        const formattedDate = now.format('YYYY-MM-DD');
        const formattedTime = now.format('HH:mm');
		const Hours = now.format('HH');
		const Minutes = now.format('mm');
        const meetingTitle = `Meeting - ${formattedDate} ${Hours}${Minutes} `;


        const folderPath = 'Meetings/';
        const templatePath = 'Miscellaneous/Templates/MeetingsTemplate.md';
		
        const fileName = `${meetingTitle}.md`;
        const filePath = `${folderPath}${fileName}`;

        const templateFile = app.vault.getAbstractFileByPath(templatePath);
        if (!templateFile) {
            throw new Error(`Template file not found: ${templatePath}`);
        }

        let templateContent = await app.vault.read(templateFile);

        templateContent = templateContent.replace(/{{title}}/g, meetingTitle);
        templateContent = templateContent.replace(/{{date}}/g, formattedDate);
        templateContent = templateContent.replace(/{{time}}/g, formattedTime);

        await app.vault.create(filePath, templateContent);

        const newFile = app.vault.getAbstractFileByPath(filePath);
        if (!newFile) {
            throw new Error(`Failed to create the new note: ${filePath}`);
        }

        app.workspace.getLeaf().openFile(newFile);

        console.log(`New meeting note created at: ${filePath}`);
    } catch (error) {
        console.error(`Failed to create meeting note: ${error.message}`);
    }
};
